
export const storeProducts = [
  {
  id:'1',
  title:'Alexa',
  subHeader:'Eco Dot',
  info:'Alexa Alexa Wake Up',
  price: 10,
  image: "image/Alexa.jpg",
  company: 'NOCOVY',
  inCart: false,
  count : 0,
  total: 0
},{
  id:'2',
  title:'Lighter',
  subHeader:'Zippo',
  info:'Burn Burn Burn',
  price:5,
  image: 'image/Lighter.jpg',
  company: 'NOCOVY',
  inCart: false,
  count : 0,
  total: 0
},{
  id:'3',
  title:'Pen',
  subHeader:'Best Pen',
  info:'Sign Contract With Luck',
  price: 1,
  image: "image/Pen.jpg",
  company: 'NOCOVY',
  inCart: false,
  count : 0,
  total: 0
}
];

export const detailProduct = {
  id:'1',
  title:'Alexa',
  subHeader:'Eco Dot',

  imageDetail: [
    {
      imageId:'1',
      imageUrl: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    },
    {
      imageId: '2',
      imageUrl: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
    },
    {
      imageId: '3',
      imageUrl: "https://images.unsplash.com/photo-1519799297475-fdcbf5f5953b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
    }
  ],
  company: 'NOCOVY',
  price:[
    {
      id: 1,
      cost: [
        {
          id: 'header',
          name:'FOB Point',
          value:'Shanghai'
        },
        {
          id:'body',
          name:'Freight Rate',
          value:'$1.20/1.00ft'
        },
        {
          id:'body',
          name:'Freight Description',
          value:`40' High Cube`
        },
        {
          id:'body',
          name:'Duty Rate',
          value:'3.49%'
        }
      ]
    },
    {
      id: 2,
      cost: [
        {
          id: 'header',
          name:'Unit Cost',
          value:'$9.20'
        },
        {
          id:'body',
          name:'Freight Cost',
          value:'$0.20'
        },
        {
          id:'body',
          name:'Duty Cost',
          value:'$0.80'
        },
        {
          id:'body',
          name:'Misc Cost',
          value:'$0.00'
        }
      ]
    },
    {
      id: 3,
      cost: [
        {
          id: 'body',
          name:'Landed Cost',
          value:'$10.20'
        },
        {
          id:'body',
          name:'Margin',
          value:'62.15%'
        },
        {
          id:'body',
          name:'Unit Price',
          value:`$36.99`
        },
       
      ]
    }
  ],

};
