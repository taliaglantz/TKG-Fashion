/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Grid, Image, Card, Divider, Header, Container, Comment, Segment, Button, Accordion, Icon } from 'semantic-ui-react'


const ProductShow = () => {

  const [product, setProduct] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [category, setCategory] = useState([])
  const [hasError, setHasError] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`api/products/${id}`)
        console.log(data)
        window.scrollTo(0, 0)
        setProduct(data)
        setCategory(product.category)
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
  }, [id])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/products')
        console.log(data)
        setAllProducts(data)
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
  }, [])

  const filterByCategory = () => {

    return allProducts.filter(product => {
      return product.category === category
    })

  }

  const accordion = [
    {
      key: 'details-and-care',
      title: 'Details & Care',
      content: [
        'All clothes are made from 100% recyclable material. Wash at no higher than 30 degrees and do not tumbledry.'
      ].join(' '),
    },
    {
      key: 'delivery-collections-and-returns',
      title: 'Delivery, Collections & Returns',
      content: {
        content: (
          <div>
            <p>Free Standard Delivery - order recieved within 3-5 days</p>
            <p>Orders can be collected for free from your local TFG Fashion store</p>
            <p>Items can be fully refunded if they are returned by post (free return label included in packaging) or to a local TFK Fashion store within 28 days of the order being delivered or collected</p>
          </div>
        ),
      },
    },
    {
      key: 'reviews',
      title: 'Reviews',
      content: {
        content: (
          // {product.review_set.map(review => {
          //   console.log(review.comment)
          // })}
          <Comment.Group>
            <Comment>
              <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                {/* <Comment.Text>{product.review_set[0].comment}</Comment.Text> */}
              </Comment.Content>
            </Comment>
          </Comment.Group>
        ),
      },
    }
  ]


  // console.log(category)
  // console.log(product.image_set[0].image)
  // console.log(product.category)
  // console.log(filteredProducts)
  return (
    <Container>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={product.image_set !== undefined ? product.image_set[0].image : null} />
            {/* <Image size='large' src={product.image_set[0].image} /> */}
          </Grid.Column>


          <Grid.Column>
            <section className='product-info-wrapper'>
              <p className='product-name' textAlign='center'>{product.name}</p>
              <p className='product-price'><Icon name='gbp' />{product.price}</p>
              <Container>
                <Segment compact inverted color={product.colour} />
              </Container>
              <br />
              <div className='product-colour'>Colour: {product.colour}</div>
              <div className='product-size'>Size: {product.size}</div>
              <br />
              <Button size='huge' color='teal'>Add to Bag</Button>
              <br />
              <br />
              <Accordion defaultActiveIndex={0} panels={accordion} />
            </section>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />

      <Header as='h3'>You may also like...</Header>
      {filterByCategory().length ?
        <Container>
          <Grid>
            <Grid.Row columns={4}>

              {filterByCategory().map((product, index) => {
                console.log(product)
                console.log(product.name)
                return (
                  <>
                    <Grid.Column>
                      <Link key={index} to={`/${product.id}`}>
                        <Card>
                          <Image src={product.image_set !== undefined ? product.image_set[0].image : null} />
                          <Card.Content>
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Description>GBP £{product.price}</Card.Description>
                          </Card.Content>
                        </Card>
                      </Link>
                    </Grid.Column>
                  </>
                )
              })}
              
            </Grid.Row>
          </Grid>
        </Container>
        :
        <Header as='h3'>{hasError ? 'Looks like you&apos;ve grabbed the last gem! 💎 ' : 'Loading products... 👗 🩳 👚 '}</Header>
      }

    </Container>







  )
}
export default ProductShow