import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Documents from './views/Documents'
import { DocumentViewModel } from './models/DocumentModel'

function App() {
  const [attachments, setAttachments] = useState([])

  const attachImage = (doc: DocumentViewModel) => {
    setAttachments([...attachments, doc])
    console.log('attaments', attachments)
  }

  const order = () => {}
  const editImage = () => {}
  const viewImage = () => {}
  const deleteImage = () => {}

  return (
    <Documents
      attachImage={attachImage}
      documents={attachments}
      order={order}
      editImage={editImage}
      viewImage={viewImage}
      deleteImage={deleteImage}
    />
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);