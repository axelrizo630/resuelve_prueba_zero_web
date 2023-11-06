import { ApiProperty } from '@nestjs/swagger';

export class ChuckNorrisJokesProxyEntity {
  @ApiProperty({
    example: '9kmZLclWRWWTdUvMoNegSQ',
    description: 'Id of the joke',
  })
  id: string;
  @ApiProperty({
    example: '2020-01-05 13:42:28.664997',
    description: 'Creation Date',
  })
  created_at: Date;
  @ApiProperty({
    example: '2020-01-05 13:42:28.664997',
    description: 'Update Date',
  })
  updated_at: Date;
  @ApiProperty({
    example: '["political"]',
    description: 'Categories that correspond',
  })
  categories: string[];
  @ApiProperty({
    example:
      'hen Barack Obama said "Yes we can," he actually was referring to Chuck Norris',
    description: 'The joke',
  })
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
