/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {database} from './config';
import {AuthApi, DBPostsInteractor, PostItemModel} from '../interfaces';
import {Post} from '../../entities/post';
import {User} from "../../entities/user";

export class PostsDBInteractor implements DBPostsInteractor {
  fetchAllPosts(): Promise<PostItemModel[]> {
    console.log('API. fetchAllPosts');
    return new Promise<PostItemModel[]>((resolve, reject) => {
      database
        .ref('main')
        .child('posts')
        .once('value')
        .then((snapshot) => {
          let items: PostItemModel[] = [];
          this.parsePosts(snapshot, items, function (post) {
            return true;
          });
          this.assignImagesUrl(items)
            .then((items) => {
              resolve(items);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  fetchMyPosts(): Promise<PostItemModel[]> {
    console.log('API. fetchMyPosts');
    return new Promise<PostItemModel[]>((resolve, reject) => {
      AuthApi().getCurrentUserId()
        .then((uid) => {
          database
            .ref('main')
            .child('posts')
            .once('value')
            .then((snapshot) => {
              let items: PostItemModel[] = [];
              this.parsePosts(snapshot, items, function (post) {
                return post.uid === uid;
              });
              this.assignImagesUrl(items)
                .then((items) => {
                  resolve(items);
                })
                .catch((error) => {
                  reject(error);
                })
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  uploadData(post: Post): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      database
        .ref('main')
        .child('posts')
        .push({
          title: post.title,
        })
        .then((url) => {
          let id = url.key;
          console.log(`Data set uploaded on key: ${id}`);
          database
            .ref('main')
            .child('posts')
            .child(id)
            .set({
              id: id,
              author: post.author,
              body: post.body,
              title: post.title,
              uid: post.uid,
              created: Date.now() / 1000.0,
              photosize: '500.0;500.0',
              starCount: 0,
            })
            .then(() => {
              resolve(id);
            })
            .catch((error) => {
              console.log(`Error: ${error}`);
            });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    });
  }

  parsePosts(snapshot, items: PostItemModel[], testPost) {
    console.log('API. parsePosts');
    if (snapshot.val() !== null) {
      snapshot.forEach((child) => {
        let post = child.val();
        if (testPost(post)) {
          const postItem: PostItemModel = {
            post: child.val(),
            imageUrl: '',
            avatarUrl: '',
            author: null,
          };
          items.push(postItem);
        }
      });
    }
  }

  assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]> {
    console.log('API. assignImagesUrl');
    return new Promise((resolve, reject) => {
      let bufferLength = items.length;
      if (bufferLength === 0) {
        resolve(items);
        return;
      }
      items.forEach((item) => {
        let postId = item.post.id;
        let userId = item.post.uid;
        Post.getDownloadURL(postId)
          .then((url) => {
            item.imageUrl = url;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            Post.getDownloadURL(userId)
              .then((url) => {
                item.avatarUrl = url;
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                AuthApi().getUser(userId)
                  .then((user) => {
                    item.author = user;
                    bufferLength -= 1;
                    if (bufferLength === 0) {
                      resolve(items);
                    }
                  })
                  .catch(() => {
                    bufferLength -= 1;
                    if (bufferLength === 0) {
                      resolve(items);
                    }
                  });
              });
          });
      });
    });
  }
}