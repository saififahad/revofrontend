import React from 'react'
import '../../../styles/main.css'

const PreSaleModal = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className='pre_modal-overlay'>
      <div className="pre_modal-content">
        <h2>《Pre-sale rules》</h2>
        <div className="pre_instructions">
          <p>"In order to protect the legitimate rights and interests of users participating in the pre- sale and maintain the normal operating order of the pre-sale, these rules are formulated in accordance with relevant agreements and laws and regulations.
            country Chapter 1 Definition1.1 Pre-sale definition: refers to a sales model in which a seller offers a bundle of a product or service collects consumer orders through
            service, collects consumer orders through product tools before selling, and makes it available to customers. consumers of goods and/or services by prior agreement1.2 Presale mode is "deposit" mode. "Consignment" refers to the pre- delivery of a fixed number of items prior to sale. "Deposit" Scam Join mini games for a chance to win more deposits. Deposits can be exchanged directly for goods. Deposit is
            not refundable. 1.3 Pre-sale product: A product that is shipped by the seller using the pre-sale product tool. Only highlight the word presale on the product name or product detail page, and products that do not use the presale product tool are not presale. 1.4 Pre-sale system: refers to the system product tool that helps sellers to sell samples before selling. 1.5 Product price before selling: is the selling price of
            the product before selling. The price of pre- sale items consists of two parts: deposit and final payment. "
          </p>

        </div>
        <div className="modal_btn">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>

    </div>
  )
}

export default PreSaleModal
