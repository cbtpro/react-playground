/**
 * 应用类型定义
 */

/**
 * 任务定义
 */
declare interface TaskObject {
    /**
     * id
     */
    id: number;
    /**
     * 任务内容
     */
    text: string;
    /**
     * 是否完成
     */
    done: boolean;
}