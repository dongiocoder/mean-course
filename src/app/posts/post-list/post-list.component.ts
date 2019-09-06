import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //  {title: 'First Post', content: 'This is the first post\'s content', },
  //  {title: 'Second Post', content: 'This is the second post\'s content', },
  //  {title: 'Third Post', content: 'This is the third post\'s content', }
  // ];
  posts: Post [] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private AuthStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.AuthStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.AuthStatusSub.unsubscribe();
  }
}
