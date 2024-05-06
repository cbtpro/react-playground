declare namespace TaskLib {
    /**
     * 任务
     */
    interface ITask {
        id: number;
        text: string;
        done: boolean;
    }
}