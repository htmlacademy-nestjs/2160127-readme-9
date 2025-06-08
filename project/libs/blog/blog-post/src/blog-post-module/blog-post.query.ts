import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { SortDirection } from '@project/shared-core';

import {DefaultSortConst} from './blog-post.constant';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DefaultSortConst.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = DefaultSortConst.PostCountLimit;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DefaultSortConst.Direction;

  @Transform(({ value }) => +value || DefaultSortConst.PageCount)
  @IsOptional()
  public page: number = DefaultSortConst.PageCount;
}
