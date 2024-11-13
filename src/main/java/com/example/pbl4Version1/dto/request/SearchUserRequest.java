package com.example.pbl4Version1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchUserRequest {
    String searchStr;
    int page;
    String sortField;
    String sortDirection;
}
