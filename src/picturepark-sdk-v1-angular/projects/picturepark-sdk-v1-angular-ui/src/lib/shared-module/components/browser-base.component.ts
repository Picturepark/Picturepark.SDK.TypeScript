import { BaseComponent } from './base.component';
import { Injector, OnInit, NgZone } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ConfigActions, PictureparkUIConfiguration, PICTUREPARK_UI_CONFIGURATION } from '../../configuration';
import { ContentModel } from '../models/content-model';

export abstract class BaseBrowserComponent<TEntity> extends BaseComponent implements OnInit {
    protected scrollDispatcher: ScrollDispatcher;
    protected ngZone: NgZone;
    private pictureParkUIConfig: PictureparkUIConfiguration;

    public configActions: ConfigActions;
    public isLoading = false;
    public items: ContentModel<TEntity>[] = [];

    abstract init(): void;
    abstract onScroll(): void;

    constructor(protected componentName: string, injector: Injector) {
        super();

        this.scrollDispatcher = injector.get(ScrollDispatcher);
        this.ngZone = injector.get(NgZone);
        this.pictureParkUIConfig = injector.get<PictureparkUIConfiguration>(PICTUREPARK_UI_CONFIGURATION);
    }

    ngOnInit(): void {
        this.configActions = this.pictureParkUIConfig[this.componentName];

        // Call abstract init class
        this.init();

        // SCROLL SUBSCRIBER
        const scrollSubscription = this.scrollDispatcher.scrolled().subscribe(scrollable => {
            if (!scrollable) { return; }

            const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
            const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

            if (scrollCriteria && !this.isLoading) {
                this.onScroll();
            }
        });
        this.subscription.add(scrollSubscription);
    }
}
