import React from 'react';
import clsx from 'clsx';
import type { DirectoryCategory } from '@/data/directory';

interface DirectoryCategoryCardProps {
  category: DirectoryCategory;
  onClick: () => void;
}

export function DirectoryCategoryCard({
  category,
  onClick,
}: DirectoryCategoryCardProps) {
  const linkCount = category.links.length;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group flex flex-col gap-3 p-6 rounded-xl border text-left',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'hover:border-primary-500 dark:hover:border-primary-500',
        'hover:shadow-lg transition-all duration-200',
        'cursor-pointer w-full'
      )}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {category.description}
      </p>
      <span className="text-xs text-gray-500 dark:text-gray-500 mt-auto">
        {linkCount} {linkCount === 1 ? 'link' : 'links'}
      </span>
    </button>
  );
}
