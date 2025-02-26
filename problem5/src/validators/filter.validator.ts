import { IsInt, Min, Max } from "class-validator";

export class GetUsersFilterDto {
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be greater than or equal to 1" })
  page: number;

  @IsInt({ message: "PageSize must be an integer" })
  @Min(1, { message: "PageSize must be greater than or equal to 1" })
  @Max(100, { message: "PageSize must be less than or equal to 100" })
  pageSize: number;

  name?: string;
  email?: string;
}
