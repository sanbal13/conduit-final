import React from 'react';
import Pagination from './Pagination';
import Posts from './Posts';
import ProfileBanner from  './ProfileBanner';
import { articlesURL } from '../utils/constant';

class Profile extends React.Component {
    state = {
        activeTab: 'author',
        articles: []
    };
    fetchData = () => {       
        fetch(articlesURL+`/?${this.state.activeTab}=${this.props.user.username}`)
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
        this.fetchData();
    }
    render() {
        const {activeTab} = this.state;
        const {user} = this.props;
        return(
            <section>
                <ProfileBanner user={user}/>
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

    export default Profile;


