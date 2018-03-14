import React from "react";
import SockJsClient from './SockJsClient';

export default class test extends React.Component {

    render() {


        return (
            <div>

                <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topic/greetings']}
                              onMessage={(msg) => {
                                  console.log(msg);
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>

            </div>);
    }
}