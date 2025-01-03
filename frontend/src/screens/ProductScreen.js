import React, {useState, useEffect} from 'react'
import {Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem} from 'react-bootstrap'
import axios from 'axios'
import Rating from '../components/Rating'

function ProductScreen({match}){
    const { id } = useParams();  
    const [products, setProducts] = useState([]);  
    const [product, setProduct] = useState([null]);  
  
    useEffect(() => {
      
      async function fetchProducts() {
        try {
            const { data } = await axios.get(`/api/products/${id}/`);
            setProduct(data);  // Set the product data once it's fetched
          } catch (error) {
            console.error('Error fetching product:', error);  // Log any errors
            
          }
      }
  
      fetchProducts();
    }, []);  
  
    
    useEffect(() => {
      if (products.length > 0) {
        const foundProduct = products.find(p => p._id === id);  
        setProduct(foundProduct);  
      }
    }, [id, products]); 
    
    // if (!product) {
    //     return <div>Loading...</div>;  // Show loading message while the product is being fetched
    //   }
      
    return(

        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>
                                {product.name}
                            </h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews` }/>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item >
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>{product.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroupItem >
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock > 0 ? 'In Stock': 'Out of Stock'}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroup.Item >
                                    <Button className='btn-block' disabled={product.countInStock == 0? true:false} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
           
        </div>
    )
}

export default ProductScreen 