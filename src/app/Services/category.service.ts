import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:44349/api/Category';

  constructor(private http: HttpClient) { }

 
  getCategories(): Observable<any[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
  
  countCategoryDuplicates(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/count-duplicates/${name}`);
  }


  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
  

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}