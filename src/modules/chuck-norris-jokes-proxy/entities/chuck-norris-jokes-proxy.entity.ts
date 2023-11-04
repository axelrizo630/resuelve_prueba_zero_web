export class ChuckNorrisJokesProxyEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  categories: string[];
  value: string;

  constructor(data: {
    id: string;
    created_at: string;
    updated_at: string;
    categories: string[];
    value: string;
  }) {
    this.id = data.id;
    this.created_at = new Date(data.created_at);
    this.updated_at = new Date(data.updated_at);
    this.categories = data.categories;
    this.value = data.value;
  }
}
