import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button,Container,Form,FormGroup} from 'react-bootstrap'

export default class FormID extends Component{
    constructor(props){
        super(props);
        this.state = {
            Email: '',
            Name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        if (event.target.name==="strEmail"){
            this.setState({Email: event.target.value})
        }else if (event.target.name==="strName"){
            this.setState({Name: event.target.value})
        }
      }
    
    handleSubmit(event) {
        event.preventDefault()
        this.sendData(this.state.Email,this.state.Name)
    }

    sendData(Email,Name){
        axios.post("/input/post",{Email: Email,Name: Name}).then(res=>{
            console.log(res)
        })
    }

    render(){
        return(
            <Container>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required="true" name="strEmail" type="email" placeholder="Example@gmail.com" value={this.state.Email} onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    Please Enter Your email for validations and logging
                    </Form.Text>
                </Form.Group>
                <FormGroup>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required="true" name="strName" type="text" placeholder="Bob" value={this.state.Name} onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    Enter Name for Identification Purposes
                    </Form.Text>
                </FormGroup>
                <Button variant="primary" type="submit" value="Submit">
                    Submit
                </Button>
            </Form>
            </Container>
        );
    }
}