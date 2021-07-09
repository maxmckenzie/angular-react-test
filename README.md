# ReactTest

The task is to convert the component from AngularJs to React. Ignore external dependencies and if possible use functional component with hooks. Resulting code does not have to be runnable.

# Example code

## documents-gallery.ts
```typescript
import { IScope } from "angular";
import { ComponentNg15, DocumentViewModel, eventBus, Order } from "./external";

// this attribute works similarly to Angular 2+ attributes
@ComponentNg15({
  selector: "documents-gallery",
  bindings: {
    documents: "<",
    order: "<",
    editImage: "&",
    viewImage: "&",
    deleteImage: "&",
  },
  templateUrl: "documents/documents-gallery.html",
})
export class DocumentsGallery {
  documents: DocumentViewModel[];
  order: Order;
  editImage: (doc: any) => Promise<any>;
  viewImage: (doc: any) => Promise<any>;
  deleteImage: (doc: any) => Promise<any>;

  static $inject = ["$scope"];

  constructor(private $scope: IScope) {}

  editImageClick(doc: DocumentViewModel) {
    return this.editImage({ doc })
      .then(() => this.$scope.$applyAsync())
      .catch(e => console.error(e));
  }

  viewImageClick(doc: DocumentViewModel) {
    return this.viewImage({ doc }).catch(e => console.error(e));
  }

  deleteImageClick(doc: DocumentViewModel) {
    return this.deleteImage({ doc })
      .then(() => this.$scope.$applyAsync())
      .catch(e => console.error(e));
  }

  getImages(): DocumentViewModel[] {
    return this.documents.filter(doc => {
      return doc.blob && doc.blob.type !== "application/pdf";
    });
  }

  getDocuments(): DocumentViewModel[] {
    return this.documents.filter(doc => {
      return doc.blob && doc.blob.type === "application/pdf";
    });
  }

  getDocumentHeading(doc: DocumentViewModel): string {
    if (!doc.itemLocalId) return "Order Document";

    const item = this.order.Items.find(item => item.LocalId === doc.itemLocalId);
    return "Item " + item.ItemNo + (item.location ? ": " + item.location : "");
  }

  attachImage() {
    eventBus.publish("attach-image");
  }
}
```

## documents-gallery.html
```html
<div class="empty documents__empty-states" ng-if="$ctrl.getImages().length === 0 && $ctrl.getDocuments().length === 0">
  <div class="empty-icon">
    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-file-earmark-richtext" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
        <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
        <path fill-rule="evenodd" d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708l1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
    </svg>
  </div>
  <p class="empty-title h4">
     No documents
  </p>
  <p class="empty-subtitle">Click the button to attach file</p>
  <div class="empty-action">
    <button class="btn btn-primary" ng-click="$ctrl.attachImage()">
      <i class="glyphicon glyphicon-plus"></i> Attach file
    </button>
  </div>
</div>
<div class="table-responsive document-list" ng-if="$ctrl.getImages().length > 0 || $ctrl.getDocuments().length > 0" style="margin-top: 20px;">
  <h3> Images </h3>
  <div class="documents-img-box">
    <div ng-repeat="doc in $ctrl.getImages()" class="img-box">
      <img render-image-blob="doc.blob" style="max-width: 100%; max-height: 100%;cursor: pointer;"
          ng-click="$ctrl.viewImageClick(doc)" />
      <div class="img-box-details">
        <span>
          <p ng-click="$ctrl.editImageClick(doc)" class="documents__edit-image-button">{{$ctrl.getDocumentHeading(doc)}}</p>
        </span>
        <p class="documents__description">{{doc.description}}</span>
        <div class="img-box-dlt">
            <button type="button" class="btn  dlt-btn" ng-click="$ctrl.deleteImageClick(doc)" title="Delete">
              <i class="glyphicon glyphicon-trash" style="float: right"></i>
            </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h3>Documents</h3>
    <div class="documents-pdf-box">
      <div ng-repeat="doc in $ctrl.getDocuments()" class="pdf-box">
        <div class="svg-box">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-text" style="cursor: pointer;" ng-click="$ctrl.viewImageClick(doc)" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
            <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z" />
            <path fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
           </svg>
            </div>
            <div class="pdf-box-details">
              <P ng-click="$ctrl.editImageClick(doc)" class="documents__edit-image-button">{{$ctrl.getDocumentHeading(doc)}}</P>
              <p class="documents__description">{{doc.description}}</p>
              <div class="pdf-box-dlt">
                <button type="button" class="btn  dlt-btn" ng-click="$ctrl.deleteImageClick(doc)"
                    title="Delete">
                  <i class="glyphicon glyphicon-trash" style="float: right"></i>
                </button>
              </div>
            </div>
          </div>
      </div>
  </div>
</div>
```

## external.ts
```typescript
export interface Order {
    Items: { LocalId: number, ItemNo: number, location: string }[];
}

export const eventBus = {
    publish(eventName:string) { },
    subscribe() { }
};

export interface DocumentViewModel {
    id: number;
    name: string;
    description: string;
    localId: number;
    itemLocalId?: number;
    extraLocalId?: number;
    productImage?: boolean;
    referenceType?: number;
    referenceTypeName?: string;
    reference?: string;
    blob: Blob;
}


export function ComponentNg15(opts: any) {
    return (target: any) => { };
}
```

Sources:
https://medium.com/@bennirus/convert-an-angular-toggle-switch-component-to-react-a0dc06711201
https://fettblog.eu/typescript-react/hooks
https://www.typescriptlang.org/docs/handbook