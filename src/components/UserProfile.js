import React from 'react';
import {withRouter} from 'react-router-dom';
import UserProfileBanner from './UserProfileBanner';
import Pagination from './Pagination';
import Posts from './Posts';
import { articlesURL, profileURL } from '../utils/constant';
class UserProfile extends React.Component {
    state = {
        activeTab: 'author',
        articles: [],
        profile: null
    };
    author = this.props.match.params.author;
    fetchData = () => {   
        fetch(articlesURL+`/?${this.state.activeTab}=${this.author}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Cannot fetch data for specific user!');
            }
            return res.json();
          })
          .then((data) =>
            this.setState({
              articles: data.articles,              
            })
          )
          .catch((err) => {
            this.setState({
              error: 'Not able to fetch articles',
            });
          });
      }
      handleClick = (e) => {
        const name = e.target.name;  
        this.setState({
            activeTab: name
        }, () => this.fetchData());
    }
    componentDidMount() {
        fetch(profileURL+ this.author).then(res => {
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    return Promise.reject(errors)
                })
            }
            return res.json()}).then(profile => this.setState({profile})).catch(error => console.log(error));
        this.fetchData();
    }
  render() {
    
    const {activeTab, profile} = this.state;
        if(!profile) {
            return 
        }
        return(
            <section>
                <UserProfileBanner author={profile} user ={this.props.user}/>
                <div className="container profile">
                <div className="nav flex justify-start">
                    <button className={`profileTab ${activeTab === 'author' ? 'active order-0': 'order-1'}`}
                    onClick={(e)=> this.handleClick(e)}
                    name="author">
                        My Articles
                    </button>
                    <button className={`profileTab ${activeTab === 'favorited' ? 'active order-0': 'order-1'}`}
                    onClick={(e)=> this.handleClick(e)}
                    name="favorited">
                        Favorited Articles
                    </button>
                </div>
                <Posts articles={this.state.articles} />
                <Pagination />
                </div>
            </section>
        )
  }
}
export default withRouter(UserProfile);
