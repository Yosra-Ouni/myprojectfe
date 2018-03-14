import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Button, Checkbox, Form, Radio} from 'semantic-ui-react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Myform extends React.Component {
    state = {}

    handleChange = (e, {value}) => this.setState({value})

    render() {
        const {value} = this.state
        return (
            <div>
                <Form>
                    <Form.Group inline>
                        <label>Type</label>
                        <Form.Field control={Radio} label='Device' value='device' checked={value === 'device'}
                                    onChange={this.handleChange}/>
                        <Form.Field control={Radio} label='Dc' value='dc' checked={value === 'dc'}
                                    onChange={this.handleChange}/>
                    </Form.Group>
                </Form>
                <Form size={'tiny'}>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name'/>
                    </Form.Field>
                    <Form.Field>
                        <label>type</label>
                        <input placeholder='type'/>
                    </Form.Field>
                    <Form.Group inline unstackable widths={2}>
                        <Form.Field>
                            <label>lat</label>
                            <input placeholder='lat'/>
                        </Form.Field>
                        <Form.Field>
                            <label>lon</label>
                            <input placeholder='lon'/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group inline unstackable widths={2}>
                        <Form.Field>
                            <label>address</label>
                            <input placeholder='address'/>
                        </Form.Field>
                        <Form.Field>
                            <label>region</label>
                            <input placeholder='region'/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group inline unstackable widths={2}>
                        <Form.Field>
                            <label>pan_id</label>
                            <input placeholder='pan_id'/>
                        </Form.Field>
                        <Form.Field>
                            <label>cell_id</label>
                            <input placeholder='cell_id'/>
                        </Form.Field>
                    </Form.Group>


                    <Form.Field>
                        <Checkbox label='I allow to show my position'/>
                    </Form.Field>
                    <if></if>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }

}


export default Myform = withRouter(Myform)
