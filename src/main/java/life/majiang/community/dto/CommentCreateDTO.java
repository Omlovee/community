package life.majiang.community.dto;

import lombok.Data;
//回复的dto
@Data
public class CommentCreateDTO {
    private Long parentId;
    private String content;
    private Integer type;
}
