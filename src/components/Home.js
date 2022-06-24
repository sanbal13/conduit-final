import React from 'react';
import Banner from './Banner';
import FeedNav from './FeedNav';
import Posts from './Posts';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import { articlesURL } from '../utils/constant';
class Home extends React.Component {
  state = {
    articles: null,
    error: '',
    articlesCount: 0,
    articlesPerPage: 5,
    activePageIndex: 1,
    activeTab:""
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_prevProps, prevStates ) {
      if(prevStates.activePageIndex !== this.state.activePageIndex || prevStates.activeTab !== this.state.activeTab) {
        this.fetchData();
      }
  }
  removeTab = () => {
    this.setState({activeTab: ''});
  }
  addTab = (value) => {
    this.setState({activeTab: value});
  }
  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePageIndex - 1) * limit;
    let tag = this.state.activeTab;
    fetch(articlesURL + `?limit=${limit}&offset=${offset}` + (tag && `&tag=${tag}`))
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) =>
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        })
      )
      .catch((err) => {
        this.setState({
          error: 'Not able to fetch articles',
        });
      });
  }
  updateCurrentPageIndex = (index) => {
    this.setState({
      activePageIndex: index
    });
  }
  render() {
    let { articles, error, articlesCount, articlesPerPage, activePageIndex, activeTab } = this.state;
    return (
      <main>
        <Banner />
        <div className="padding">
          <div className="container flex item-start">
            <section className="flex-70">
              <FeedNav activeTab={activeTab} removeTab={this.removeTab}/>
              <Posts articles={articles} error={error} user={this.props.user}/>
              <Pagination
                articlesCount={articlesCount}
                articlesPerPage={articlesPerPage}
                activePageIndex={activePageIndex}
                updateCurrentPageIndex =  {this.updateCurrentPageIndex} />
            </section>
            <div className="flex-30">
              <Sidebar addTab={this.addTab}/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default Home;
