import { AxeloteRepository, q } from '@axelote/js';

export const todoRepository = AxeloteRepository.of({
    findAll: q('@sql select title, completed from todo where username = :username'),
    create: q('@sql insert into todo (title, username, completed) values (:title, :username, :completed)'),
    editByTitle: q('@sql update todo set title = :newTitle where title = :prevTitle and username = :username'),
    deleteByTitle: q('@sql delete from todo where title = :title and username = :username'),
    changeCompletionByTitle: q('@sql update todo set completed = :completed where title = :title and username = :username'),
    removeCompleted: q('@sql delete from todo where completed = true and username = :username'),
});