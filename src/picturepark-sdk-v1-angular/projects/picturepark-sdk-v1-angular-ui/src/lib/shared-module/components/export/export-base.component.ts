import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// ANGULAR CDK
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

// LIBRARIES
import { FieldBase, SchemaDetail } from '@picturepark/sdk-v1-angular';

// SERVICES
import { TranslationService } from '../../services/translations/translation.service';

// INTERFACES
import { ItemNode, ItemNodeFlatNode } from './item-nodes';
import FieldHelper from '../field-helper';
import SchemaField from './schema-field';

export abstract class ExportBaseComponent implements OnInit {

  public get isAllSelected() {
    return this.treeControl
      && this.treeControl.dataNodes
      && this.treeControl.dataNodes.filter(x => x.isSelectable).length === this.checklistSelection.selected.length;
  }

  constructor(public translationService: TranslationService) { }

  public get hasSomeFieldsSelected() {
    return !this.checklistSelection.hasValue();
  }

  protected abstract get fileName(): string;

  public isSelectAllActive = false;
  public checklistSelection: SelectionModel<ItemNodeFlatNode>;
  public treeControl: FlatTreeControl<ItemNodeFlatNode>;
  public treeFlattener: any;
  public dataSource: any;
  public itemsNodes: ItemNode[];
  public notSupportedText: string;
  public abstract isExporting: Observable<boolean>;

  public abstract export(): void;
  public abstract cancel(): void;

  public isSelectableNode(node: ItemNodeFlatNode) {
    const descendants = this.treeControl.getDescendants(node);
    if (descendants.length) {
      return node.isSelectable && descendants.some(x => x.isSelectable);
    } else {
      return node.isSelectable;
    }
  }

  ngOnInit() {
    this.notSupportedText = this.translationService.translate('NotSupported');
    this.treeControl = new FlatTreeControl<ItemNodeFlatNode>(node => node.level, node => node.expandable);
    /** The selection for checklist */
    this.checklistSelection = new SelectionModel<ItemNodeFlatNode>(true /* multiple */);
    this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.fields);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  public transformer = (node: ItemNode, level: number) => {
    return {
      expandable: !!node.fields && node.fields.length > 0,
      id: node.id,
      names: node.names,
      level: level,
      schemaId: node.schemaId,
      required: node.required,
      isSelectable: node.isSelectable
    };
  }

  public hasChild = (_: number, node: ItemNodeFlatNode) => node.expandable;

  public getLevel = (node: ItemNodeFlatNode) => node.level;

  public selectAll() {
    const selectableNodes = this.treeControl.dataNodes.filter(x => x.isSelectable);

    if (this.isAllSelected) {
      this.checklistSelection.deselect(...selectableNodes);
    } else {
      this.checklistSelection.select(...selectableNodes);
    }
  }

  /** Whether all the descendants of the node are selected. */
  public descendantsAllSelected(node: ItemNodeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node).filter(x => x.isSelectable);
    if (descendants.length > 0) {
      const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      return descAllSelected;
    } else {
      return false;
    }
  }

  /** Whether part of the descendants are selected */
  public descendantsPartiallySelected(node: ItemNodeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node).filter(x => x.isSelectable);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  public todoItemSelectionToggle(node: ItemNodeFlatNode): void {
    if (node.isSelectable) {
      const descendants = this.treeControl.getDescendants(node).filter(x => x.isSelectable);
      if (descendants.length) {
        this.checklistSelection.toggle(node);

        this.checklistSelection.isSelected(node)
          ? this.checklistSelection.select(...descendants)
          : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
      }
    }
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  public todoLeafItemSelectionToggle(node: ItemNodeFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  public checkAllParentsSelection(node: ItemNodeFlatNode): void {
    let parent: ItemNodeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ItemNodeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: ItemNodeFlatNode): ItemNodeFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  // workaround to set up file name
  protected downloadFile(file: Blob) {
    if (navigator.msSaveBlob) { // For ie and Edge
      return navigator.msSaveBlob(file, this.fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      link.download = this.fileName;
      document.body.appendChild(link);
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      link.remove();
      window.URL.revokeObjectURL(link.href);
    }
  }

  protected prepareItemsNodes(schema: SchemaDetail, referencedSchemas: SchemaDetail[], field: FieldBase | null = null): ItemNode[] {
    return schema.fields!.map(f => {

      const isSelectable = this.isSelectable(f);
      const name = this.getFieldName(f, isSelectable);

      // handle referenced fields
      if (FieldHelper.isReferencedField(f)) {
        let supportedFields: ItemNode[];

        const refSchema = referencedSchemas.filter(tg => tg.id === (f as any).schemaId)[0];
        //  the second part is check in case if it is self referenced
        if (FieldHelper.isSingleFieldset(f) && (!field || (field && field.id !== f.id && schema.id !== refSchema.id))) {
          supportedFields = this.prepareItemsNodes(refSchema, referencedSchemas, f);
        } else {
          supportedFields = refSchema.fields!.map(s => {

            const isSelectableVal = this.isSelectable(s);
            const nameVal = this.getFieldName(s, isSelectable);

            return new ItemNode(s.id, nameVal, null, refSchema.id, false, isSelectableVal);
          });

          if (FieldHelper.isTagBox(f)) {
            supportedFields.push(new ItemNode('_refId', 'ReferenceId', null, refSchema.id, false));
          }
        }
        return new ItemNode(f.id, name, supportedFields, schema.id, f.required, isSelectable);
      } else {
        // all fields except of referenced fields
        return new ItemNode(f.id, name, null, schema.id, f.required, isSelectable);
      }
    });
  }

  private getFieldName(field: FieldBase, isSelectable: boolean) {
    let name = this.translationService.translate(field.names);
    if (!isSelectable) {
      name = `${name} [${FieldHelper.getFieldName(field)} ${this.notSupportedText}]`;
    }
    return name;
  }

  private isSelectable(field: FieldBase) {
    return FieldHelper.isAllowedField(field) && (FieldHelper.isExportable(field) || FieldHelper.isReferencedField(field));
  }

  protected getSelectedSchemaFields(): SchemaField[] {
    const schemaFields = new Array<SchemaField>();

    this.checklistSelection.selected.filter(x => x.schemaId != null && !x.expandable).forEach(x => {
      const schemaField = this.prepareSchemaFields(x);
      this.addSchemaField(schemaFields, schemaField);
    });

    return schemaFields;
  }

  private addSchemaField(schemaFields: SchemaField[], newSchemaField: SchemaField) {

    const existedSchemaField = schemaFields.find(x => x.fieldId === newSchemaField.fieldId && x.schemaId === newSchemaField.schemaId);
    if (existedSchemaField) {
      existedSchemaField.schemaFields = existedSchemaField.schemaFields || [];
      this.mergeSchemaFields(existedSchemaField.schemaFields, newSchemaField.schemaFields);
    } else {
      schemaFields.push(newSchemaField);
    }
  }

  private prepareSchemaFields(node: ItemNodeFlatNode, childSchemaField: SchemaField | null = null): SchemaField {
    const schemaField = new SchemaField(node.id, node.schemaId);

    if (childSchemaField) {
      schemaField.schemaFields = schemaField.schemaFields || [];
      schemaField.schemaFields.push(childSchemaField);
    }

    const parent = this.getParentNode(node);
    if (parent && parent.schemaId) {
      // schemaField becomes childSchema for parent node
      return this.prepareSchemaFields(parent, schemaField);
    }

    return schemaField;
  }

  private mergeSchemaFields(schemaFields: SchemaField[], newSchemaFields: SchemaField[]) {
    newSchemaFields.forEach(x => {
      this.addSchemaField(schemaFields, x);
    });
  }

}



