export default function Header({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className='sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-slate-800 py-2 pe-1 ps-4 text-2xl font-medium text-background'>
      <h1>{title}</h1>
      <div className='flex items-center gap-2'>{children}</div>
    </div>
  )
}
