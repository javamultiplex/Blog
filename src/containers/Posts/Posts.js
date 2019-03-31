import React, { Component } from 'react';
import './Posts.css';
import Post from '../../components/Post/Post';
import axios from '../../axios';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId:null
    }

    componentDidMount() {
        axios.get('/posts').then(
            response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({ posts: updatedPosts });
            }
        ).catch(errors=>{
            //this.setState({errors:true});
        });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    }

    render() {
        let posts=<p style={{textAlign:'center'}}>Something went wrong!!</p>;
        if(!this.state.errors){
            posts = this.state.posts.map(
                post => {
                    return <Post key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                }
            );
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;