import React, { Component } from 'react'
import contractService from '../services/contract-service'
import ipfsService from '../services/ipfs-service'
import { Link } from 'react-router-dom'


class ListingsDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      ipfsHash: null,
      lister: null,
      unitsAvailable: null,
      pictures: []
    }
    this.handleBuyClicked = this.handleBuyClicked.bind(this)
  }

  componentWillMount() {
    contractService.getListing(this.props.listingId)
    .then((listingContractObject) => {
      this.setState(listingContractObject)
        ipfsService.getListing(this.state.ipfsHash)
        .then((listingJson) => {
          this.setState(JSON.parse(listingJson).data)
        })
        .catch((error) => {
          console.error(`Error fetching IPFS info for listingId: ${this.props.listingId}`)
        })
    })
    .catch((error) => {
      console.error(`Error fetching contract info for listingId: ${this.props.listingId}`)
    })
  }

  handleBuyClicked() {
    const unitsToBuy = 1;
    const totalPrice = (unitsToBuy * this.state.price);
    contractService.buyListing(this.props.listingId, unitsToBuy, totalPrice)
    .then((transactionReceipt) => {
      console.log("Purchase request sent.")
      // TODO (Stan) : Give confirmation once transaction is confirmed on chain.
      alert("Purchase request sent.")
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    });
  }

  render() {
    return (
      <div className="listing-detail">
        <div className="carousel">
          {this.state.pictures.map(pictureUrl => (
            <div className="photo">
              <img src={pictureUrl} role='presentation' key={pictureUrl}/>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="buy-box">
            <div>
              <span>Price</span>
              <span className="price">{Number(this.state.price).toFixed(3)} ETH</span>
            </div>
            <div>
              <Link to={`/listing/${this.props.listingId}/buy`}>
                <button className="button" onClick={this.handleBuyClicked}>
                  Buy Now
                </button>
                </Link>
              </div>
          </div>
          <div className="info-box">
            <div className="category">{this.state.category}</div>
            <div className="title">{this.state.name}</div>
            <div className="description">{this.state.description}</div>
            <div className="debug">
              <li>IPFS: {this.state.ipfsHash}</li>
              <li>Lister: {this.state.lister}</li>
              <li>Units: {this.state.unitsAvailable}</li>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListingsDetail
