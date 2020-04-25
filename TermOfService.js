import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Paper, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import StyledButton from '../layout/StyledButton'
import ProductDetailCard from '../layout/ProductDetailCard'
import ColorLinearProgress from '../layout/ColorLinearProgress'

export class TermOfService extends Component {
    render() {
        return (
            <div className="container" style={{ textAlign: 'center' }}>
                <h3>Nocovy Terms of Service</h3>
                <br />
                <b>MINIMUM ORDER VALUE</b>
                <p>For first time wholesale customers of Nocovy the minimum order value is $50. Payment is due at the time of order.</p>
                <br />
                <b>PRODUCT SELECTION</b>
                <p>We reserve the right to choose which products are available for wholesale purchase.  Some SKUs available via our website may not be suitable for retail sale due to packaging, quantity available etc.</p>
                <br />
                <b>HOW TO PLACE AN ORDER</b>
                <p>Prior to approval as a wholesale customer you must first register on our website for a wholesale account.
                So that we might register your account as a wholesale customer you must then submit a Wholesale Application
                Upon approval as a wholesale customer you will be able to preview wholesale pricing, shop for products, view inventory availability, and place orders directly from our website.</p>
                <br />
                <b>MSRP</b>
                <p>Products or goods purchased from Nocovy shall be sold at 200% minimum markup. Retailer may discount after selling at MSRP for a reasonable period of time.</p>
                <br />
                <b>ONLINE SALES</b>
                <p>Wholesale accounts are available to brick-and-mortar retail shops, or online retailers with their own storefronts (websites).  Businesses are forbidden from selling Nocovy merchandise on any other online retail outlet. Nocovy merchandise may not be sold on Amazon, EBay, through Facebook Buy-In Groups or any other means.</p>
                <br />
                <b>WHOLESALE PRICING</b>
                <p>Wholesale pricing is displayed on Nocovy when logged in and approved as a wholesaler. All prices are listed in US dollars. Prices are subject to change without notice but confirmed order pricing will be honored. (If you do not immediately seeing wholesale pricing after approval, please log out and log back in.)</p>
                <br />
                <b>PAYMENTS</b>
                <p>Nocovy accepts credit cards (MasterCard, Visa, Discover, and American Express) and PayPal. </p>
                <br />
                <b>SHIPPING</b>
                <p>Shipping is not included in the cost of goods. Nocovy makes every attempt to ship out orders within 24 hours, however please allow up to 5 business days for order processing and fulfillment.</p>
                <br />
                <b>RETURNS</b>
                <p>No returns of wholesale orders will be accepted.</p>
                <br />
                <b>Coupon/disCount codes</b>
                <p>Unless otherwise indicated, coupon/discount codes will not be honored for wholesale purchases due to our already low margins.</p>
                <br />
                <b>DAMAGES & DEFECTS</b>
                <p>Please inspect all shipments immediately upon arrival. Contact Nocovy within 5 business days of receipt of damaged or defective shipments. Returned merchandise will be replaced with new merchandise. Returned merchandise will not be accepted if it is held for more than 15 days after receipt.</p>
                <br />
                <b>SHIPPING AND INTERNATIONAL ORDERS</b>
                <p>International orders will be dealt with on a case by case basis.</p>
                <br/><br/>
            </div>
        )
    }
}

export default TermOfService
