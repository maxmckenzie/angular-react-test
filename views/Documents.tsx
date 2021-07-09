console.log('dave')
import React, { FunctionComponent, useState } from 'react';
import { DocumentComponentParams } from './models/DocumentModel'
import {
  Button,
  IconDocument
} from '../components'

function Documents ({
  attachImage
  documents
  order
  editImage
  viewImage
  deleteImage
}: DocumentComponentParams) {
  const handleEditImage = async (doc: DocumentViewModel) => {
    try {
      await editImage({ doc });
      // not sure what this.$scope.$applyAsync() is trying to do
    } catch(e) { console.log(e) };
  };

  const handleViewImage = async (doc: DocumentViewModel) => {
    return viewImage({ doc }).catch(e => console.error(e));
  };

  const handleDeleteImage = async (doc: DocumentViewModel) => {
    try {
      await deleteImage({ doc });
      // not sure what this.$scope.$applyAsync() is trying to do
    } catch(e) { console.log(e) };
  };

  const getImages = (): DocumentViewModel[] => {
    return this.documents.filter(doc => {
      return doc.blob && doc.blob.type === "application/pdf";
    });
  };

  const getDocuments = (): DocumentViewModel[] => {
    return this.documents.filter(doc => {
      return doc.blob && doc.blob.type !== "application/pdf";
    });
  };

  const getDocumentHeading = (doc: DocumentViewModel): string => {
    if (!doc.itemLocalId) return "Order Document";

    const item = this.order.Items.find(item => item.LocalId === doc.itemLocalId);
    return "Item " + item.ItemNo + (item.location ? ": " + item.location : "");
  };

  const EmptyState = () => (
    <>
      <div className="empty-icon">
        <IconDocument size={'2rem'}/>
      </div>
      <p className="empty-title h4">
         No documents
      </p>
      <p className="empty-subtitle">Click the button to attach file</p>
      <div className="empty-action">
        <Button
          label="Attach file"
          icon="plus"
          onClick={() => attachImage('Attachment Event')}
          className="btn btn-primary"
        />
      </div>
    </>
  );

  return (
    <>
      <EmptyState/>
      {getImages.length > 0 || getDocuments.length > 0 ? (
        <div class="table-responsive document-list" style="margin-top: 20px;">
          <h3>Images</h3>
          <div class="documents-img-box">
            {getImages && getImages.map(doc => (
              <div class="img-box">
                <img
                  src={doc.blob} style="max-width: 100%; max-height: 100%;cursor: pointer;"
                  onClick={() => handleViewImage(doc)}
                />
                <div class="img-box-details">
                  <span>
                    <p onClick={() => handleEditImage(doc)} class="documents__edit-image-button">
                      {getDocumentHeading(doc)}
                    </p>
                  </span>
                  <p class="documents__description">
                    {doc.description}
                  </span>
                  <div class="img-box-dlt">
                    <Button
                      label="delete"
                      icon="trash"
                      class="btn dlt-btn"
                      onClick={() => handleDeleteImage(doc)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3>Documents</h3>
          <div class="documents-pdf-box">
            {getDocuments && getDocuments.map(doc => (
              <div class="pdf-box">
                <div class="svg-box">
                  <IconDocument size={'1rem'} onClick={() => viewImageClick(doc)}/>
                </div>
                <div class="pdf-box-details">
                  <p onClick={() => handleEditImage(doc)} class="documents__edit-image-button">
                    {getDocumentHeading(doc)}
                  </P>
                  <p class="documents__description">
                    {doc.description}
                  </p>
                  <div class="pdf-box-dlt">
                    <Button
                      label="delete"
                      icon="trash"
                      class="btn dlt-btn"
                      onClick={() => handleDeleteImage(doc)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : 'no attachments'}
    </>
  );
};

export default Documents;
