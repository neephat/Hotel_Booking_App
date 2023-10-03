import React, { Component } from "react";
import axios from "axios";

import { Formik } from 'formik';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Booking extends Component {
    state = {
        alertShow: false,
        alertText: null,
        alertType: null
    }

    render() {
        console.log(this.props);
        return (
            <div className="container" style={{ paddingLeft: "20px", textAlign: "left" }}>
                <Formik initialValues={
                    {
                        firstname: "",
                        lastname: "",
                        telnum: "",
                        email: "",
                        hotel : this.props.hotel.name,
                        price : this.props.hotel.price,
                        category : this.props.hotel.category,
                    }
                }

                    onSubmit={(values, { setSubmitting }) => {
                         const hotel = this.props.hotel;
                         hotel.room = this.props.hotel.room - 1;
                        
                        axios.post("https://hotel-booking-b8c52-default-rtdb.asia-southeast1.firebasedatabase.app/booking.json", values)
                            .then(response => {
                                axios.put("https://hotel-booking-b8c52-default-rtdb.asia-southeast1.firebasedatabase.app/hotels/"+this.props.hotel.id+".json", hotel)
                                .then(response => console.log("updated"))
                            })
                            window.alert("Room Booked for you!");
                        this.props.toggleModal();
                    }}
                >

                    {({ values, handleChange, handleSubmit}) => (
                        <Form className="col-12" onSubmit={handleSubmit}>
                            <h3>Confirm Booking</h3><br />
                            <h4>{this.props.hotel.name}</h4>
                            <h5>{this.props.hotel.category}</h5>
                            <h5>Price : {this.props.hotel.price} BDT</h5>
                            <br/>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input
                                    required
                                    type="text"
                                    name="firstname"
                                    onChange={handleChange}
                                    value={values.firstname} />
                            </FormGroup>

                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    required
                                    type="text"
                                    name="lastname"
                                    onChange={handleChange}
                                    value={values.lastname}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Phone Number</Label>
                                <Input
                                    required
                                    type="number"
                                    name="telnum"
                                    onChange={handleChange}
                                    value={values.telnum}
                                />
                            </FormGroup>

                            <Button type="submit" className="btn btn-info" style={{fontWeight: 'bold'}}>
                                Book
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Booking;