import React from 'react';
import clsx from 'clsx';
import type { DirectoryLink } from '@/data/directory';

interface DirectoryLinkItemProps {
  link: DirectoryLink;
}

export function DirectoryLinkItem({ link }: DirectoryLinkItemProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group flex flex-col gap-2 p-5 rounded-xl border h-full',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'hover:border-primary-500 dark:hover:border-primary-500',
        'hover:shadow-lg',
        'transition-all duration-200'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {link.title}
        </h4>
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {link.description}
      </p>
    </a>
  );
}
