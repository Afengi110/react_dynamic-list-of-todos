import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFiltredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

enum SortStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filterTodos(
  todos: Todo[],
  status: SortStatus,
  searchTerm: string,
): Todo[] {
  const term = searchTerm.trim().toLowerCase();

  let filtered = todos.filter(todo => {
    switch (status) {
      case SortStatus.Active:
        return !todo.completed;
      case SortStatus.Completed:
        return todo.completed;
      case SortStatus.All:
      default:
        return true;
    }
  });

  if (term) {
    filtered = filtered.filter(todo => todo.title.toLowerCase().includes(term));
  }

  return filtered;
}

export const TodoFilter: React.FC<Props> = ({ todos, setFiltredTodos }) => {
  const [sortStatus, setSortStatus] = useState<SortStatus>(SortStatus.All);
  const [SearchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const filtered = filterTodos(todos, sortStatus, SearchTerm);

    setFiltredTodos(filtered);
  }, [todos, sortStatus, SearchTerm, setFiltredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortStatus}
            onChange={event => setSortStatus(event.target.value as SortStatus)}
          >
            <option value={SortStatus.All}>All</option>
            <option value={SortStatus.Active}>Active</option>
            <option value={SortStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={SearchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {SearchTerm && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchTerm('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
