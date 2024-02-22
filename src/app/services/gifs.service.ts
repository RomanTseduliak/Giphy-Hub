import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse, DefaultResponse } from "../interfaces/gifs.interfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GifsService {

    private apiKey = 'yEz56jwAZMRRNsfAtB5cYbrof7Sqm5ij';
    private serviceUrl = 'https://api.giphy.com/v1/gifs';
    private tagsHistoryArray: string[] = [];
    public gifList: Gif[] = [];
    gifsNotFound = new BehaviorSubject(false)
    isLoading = new BehaviorSubject(false)
    isDefaultList = new BehaviorSubject(true)

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
    }

    get tagsHistory() {
        return [...this.tagsHistoryArray];
    }

    private organizeHistory(tag: string) {
        tag = tag.toLowerCase();

        if (this.tagsHistoryArray.includes(tag)) {
            this.tagsHistoryArray = this.tagsHistoryArray.filter((oldTag) => oldTag !== tag)
        }
        this.tagsHistoryArray.unshift(tag);
        this.tagsHistoryArray = this.tagsHistoryArray.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this.tagsHistoryArray));
    }

    private loadLocalStorage(): void {
        if (localStorage.getItem('history')) {
            this.tagsHistoryArray = JSON.parse(localStorage.getItem('history')!);
        }
        if (this.tagsHistoryArray.length === 0) return;
        this.searchTag(this.tagsHistoryArray[0]);
    }

    searchTag(tag: string): void {
        this.organizeHistory(tag);
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', tag)
            .set('limit', '10')

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe(resp => {
                this.isLoading.next(true)
                setTimeout(() => {
                    if (resp.data.length === 0) {
                        this.gifsNotFound.next(true)
                        this.isLoading.next(false)
                        this.gifList = []
                        this.isDefaultList.next(false);
                    } else {
                        this.gifList = resp.data;
                        this.gifsNotFound.next(false)
                        this.isLoading.next(false)
                    }
                }, 3000);
            })
    }

    getData() {
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', 'trending')
            .set('limit', '25')
            .set('rating', 'g');

        this.http.get<DefaultResponse>(`${this.serviceUrl}/trending`, { params })
            .subscribe(resp => {
                this.isLoading.next(true)
                setTimeout(() => {
                    this.gifList = resp.data;
                }, 3000);
            })

    }


}