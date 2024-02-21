import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";

@Injectable({providedIn: 'root'})
export class GifsService {

    // private apiKey = 'p6Yo4ENeEhunpTvC0wk6M3742ctGIBnY'; // My API Key old
    private apiKey = 'yEz56jwAZMRRNsfAtB5cYbrof7Sqm5ij';
    private serviceUrl = 'https://api.giphy.com/v1/gifs';
    public gifList: Gif[] = [];

    private tagsHistoryArray: string[] = [];

    constructor( private http: HttpClient ) {
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

    private saveLocalStorage():void {
        localStorage.setItem('history', JSON.stringify( this.tagsHistoryArray ));
    }

    private loadLocalStorage():void {
        if (localStorage.getItem('history')) {
            this.tagsHistoryArray = JSON.parse(localStorage.getItem('history')!);
        }

        if (this.tagsHistoryArray.length === 0) return;

        this.searchTag(this.tagsHistoryArray[0]);
    }

    searchTag(tag:string): void {
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        console.warn(this.tagsHistory);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', tag)
            .set('limit', '10')

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe( resp => {

                this.gifList = resp.data;
                // console.warn({ Gifs: this.gifList })
            })

        // fetch('https://api.giphy.com/v1/gifs/search?api_key=p6Yo4ENeEhunpTvC0wk6M3742ctGIBnY&q=pokemon&limit=10')
        //     .then(resp => resp.json())
        //     .then(data => console.warn(data))
    }
}