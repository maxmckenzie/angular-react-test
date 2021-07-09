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

export interface DocumentComponentParams = {
  attachImage: any,
  documents: DocumentViewModel,
  order: Order,
  editImage: any,
  viewImage: any,
  deleteImage: any
}
// export function ComponentNg15(opts: any) {
//   return (target: any) => { };
// }