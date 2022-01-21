import { useEffect, useState } from 'react';
import { Button } from '../components/Button';

import { api } from '../services/api';
import '../styles/sidebar.scss';

import { GenreResponseProps } from '../App';

interface SidebarProps {
  genreId: number;
  onClick: Function;
}

export function SideBar({ genreId, onClick }: SidebarProps) {
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (

    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClick(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>

    </nav>

  )
}