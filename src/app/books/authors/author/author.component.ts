import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author, Book } from '../../model/book';
import { BooksService } from '../../service/books.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [NgIf],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private BooksService: BooksService = inject(BooksService);

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.subscription = this.BooksService.getAuthor(id).subscribe({
          next: (data: Author) => {
            this.selectedAuthor = data;
          },
          error: (_: any) => {
            this.selectedAuthor = null;
          }
        });
      });
    }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
