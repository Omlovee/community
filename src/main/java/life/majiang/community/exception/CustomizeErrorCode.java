package life.majiang.community.exception;

public enum CustomizeErrorCode implements ICustomizeErrorCode {

    QUESTION_NOT_FOUND(2001, "你的问题不见了！"),
    TARGET_PARAM_NOT_FOUND(2002, "未选中任何问题或评论进行回复！"),
    NO_LOGIN(2003,"当前操作需要登录，请登录重试！"),
    SYS_ERROR(2004,"访问错误！"),
    TYPE_PARAM_WRONG(2005,"评论类型错误或不存在！"),
    COMMENT_NOT_FOUND(2006,"回复的评论不存在！"),
    CONTENT_IS_EMPTY(2007,"输入的内容不能为空！"),
    READ_NOTIFICATION_FAIL(2008,"不允许读取别人的信息！"),
    NOTIFICATION_NOT_FOUND(2009, "没有消息！"),
    ;


    private String message;
    private Integer code;
    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public Integer getCode() {
        return code;
    }

    CustomizeErrorCode(Integer code, String message) {
        this.message = message;
        this.code = code;
    }
}
