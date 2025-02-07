export interface DogModel {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export interface DogSearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}

export interface MatchResponse {
    match: string;
}

export interface SearchParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: number;
    sort?: string; // e.g., 'breed:asc'
}
  