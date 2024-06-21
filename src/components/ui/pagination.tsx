'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1 sm:gap-0', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    onClick={() => {
      NProgress.start()
    }}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('gap-1 pl-2.5 sm:pl-0 sm:pr-0', className)}
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
    <span className='sm:hidden'>Prev</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5 sm:pl-0 sm:pr-0', className)}
    {...props}
  >
    <span className='sm:hidden'>Next</span>
    <ChevronRight className='h-4 w-4' />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-4 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More totalPages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

const CPagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber?.toString())
    return `${pathname}?${params?.toString()}`
  }

  const showLinks = () => {
    const visiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
    const endPage = Math.min(totalPages, startPage + visiblePages - 1)

    // adjust startPage if we're at the end of the pages and there's room to show more previous pages
    startPage = Math.max(1, endPage - visiblePages + 1)

    const pageLinks = []

    // first page and ellipsis
    if (startPage > 2) {
      pageLinks.push(
        <PaginationItem key='first'>
          <PaginationLink href={createPageURL(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      pageLinks.push(<PaginationEllipsis key='ellipsis-before' />)
    } else if (startPage === 2) {
      pageLinks.push(
        <PaginationItem key='first'>
          <PaginationLink href={createPageURL(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      )
    }

    // visible pages
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem
          key={`page-${i}`}
          className={currentPage === i ? 'pointer-events-none' : ''}
        >
          <PaginationLink href={createPageURL(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // ellipsis and last page
    if (endPage < totalPages - 1) {
      pageLinks.push(<PaginationEllipsis key='ellipsis-after' />)
      pageLinks.push(
        <PaginationItem key='last'>
          <PaginationLink
            href={createPageURL(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    } else if (endPage === totalPages - 1) {
      pageLinks.push(
        <PaginationItem key='last'>
          <PaginationLink
            href={createPageURL(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pageLinks
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
        >
          <PaginationPrevious href={createPageURL(currentPage - 1)} />
        </PaginationItem>
        {showLinks()}
        <PaginationItem
          className={
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          }
        >
          <PaginationNext href={createPageURL(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CPagination
