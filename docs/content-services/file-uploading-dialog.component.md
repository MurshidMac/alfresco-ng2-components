---
Added: v2.0.0
Status: Active
Last reviewed: 2018-05-08
---

# File Uploading Dialog Component

Shows a dialog listing all the files uploaded with the Upload Button or Drag Area components.

## Basic Usage

```html
<adf-file-uploading-dialog></adf-file-uploading-dialog>
```

## Class members

### Properties

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| position | `string` | "right" | Dialog position. Can be 'left' or 'right'. |

### Events

| Name | Type | Description |
| ---- | ---- | ----------- |
| error | [`EventEmitter`](https://angular.io/api/core/EventEmitter)`<any>` | Emitted when a file in the list has an error. |

## Details

This component should be used in combination with the
[Upload Button component](upload-button.component.md) or the
[Upload Drag Area component](upload-drag-area.component.md).

## See also

-   [Upload button component](upload-button.component.md)
-   [Upload drag area component](upload-drag-area.component.md)
