import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';


const api = {
    baseUrl: 'https://jsonplaceholder.typicode.com/posts'
};

class Jobs extends Component {
    constructor(props) {
            super(props);
            this.state = {
                listData: [],
                hasMoreItems: true,
                nextHref: null
        };
    }

    fetchData(){
            var self = this;           
            var url = api.baseUrl;
            if(this.state.nextHref) {
                url = this.state.nextHref;
            }

            fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        var list = self.state.listData;                        
                        json.data.map(data => {
                            list.push(data);
                        });

                        if(json.next_page_url != null) {
                            self.setState({
                                nextHref: resp.next_page_url,
                                listData: list                               
                            });
                        } else {
                            self.setState({
                                hasMoreItems: false
                            });
                        }
                    })
                    .catch(error => console.log('err ' + error));

        }
    }

    componentDidMount()
    {
       this.fetchData();
    }

    render() 
    {
    const loader = <div className="loader">Loading ...</div>;
    let JobItems; 
    if(this.state.listData){  
        JobItems = this.state.listData.map(Job => {
        return (
            <tr>
                <td>{Job.job_number}</td>
                <td>{Job.title}</td>
                <td>{Job.body}</td>
                <td>{Job.id}</td>
            </tr>
        );
      });
    };

        return(<div className="container">
            <h2>Jobs List</h2>

            <InfiniteScroll
                pageStart={0}
                loadMore={this.fetchData.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Job Number</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {JobItems}
                </tbody>
                </table>
            </InfiniteScroll>
        </div>
    </div>
    );
  }



export default Jobs;