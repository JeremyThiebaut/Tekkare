interface KPICardProps {
  title: string
  value: string
  icon: string
}

export default function KPICard({ title, value, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title} {icon}</h2>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
    </div>
  )
}