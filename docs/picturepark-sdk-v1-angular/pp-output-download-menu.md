# pp-output-download-menu

Renders the button for downloading images with possibility to choose image format.

    <pp-output-download-menu [id]="ifG28Fsd" [overlapTrigger]="true" [yPosition]="'below'" [xPosition]="'after'"></pp-output-download-menu>

Properties:

- **id string (required):** The id of image
- **formats string[] (optional):** The array of output formats specific for the current image
- **overlapTrigger boolean (optional):** Whether the menu should overlap the menu trigger. False by default.
- **xPosition string (optional):** The x-axis position of the menu. Can be 'before' | 'after'. The value 'before' by default.
- **yPosition string (optional):** The y-axis position of the menu. Can be 'above' | 'below'. The value 'above' by default.
