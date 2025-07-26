import { PageLayout } from "@/components/ui/page-layout"

export default function PrivacidadePage() {
  return (
    <PageLayout title="Política de Privacidade" lastUpdated="26 de Julho de 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Informações que Recolhemos</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Na TaxiFatura, respeitamos a sua privacidade e comprometemo-nos a proteger os seus dados pessoais.
              Esta política explica como recolhemos, utilizamos e protegemos as suas informações quando utiliza a nossa plataforma.
            </p>
            <p><strong>Informações que recolhemos:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome completo e informações de contacto (email, telefone)</li>
              <li>Dados das viagens (origem, destino, valores, datas)</li>
              <li>Informações dos clientes fornecidas por si para emissão de faturas</li>
              <li>Dados de utilização da plataforma para melhorar o serviço</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Como Utilizamos os Seus Dados</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>Os seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gerar faturas e recibos profissionais</li>
              <li>Manter o histórico das suas viagens e rendimentos</li>
              <li>Fornecer suporte técnico quando necessário</li>
              <li>Melhorar a funcionalidade da plataforma</li>
              <li>Comunicar atualizações importantes do serviço</li>
            </ul>
            <p>
              <strong>Nunca vendemos ou partilhamos os seus dados</strong> com terceiros para fins comerciais.
              A sua informação permanece confidencial e segura.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Segurança dos Dados</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Implementamos medidas de segurança robustas para proteger os seus dados:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encriptação de dados em trânsito e em repouso</li>
              <li>Servidores seguros localizados na União Europeia</li>
              <li>Acesso restrito apenas a pessoal autorizado</li>
              <li>Backups regulares e seguros</li>
              <li>Monitorização contínua de segurança</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Os Seus Direitos</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>Conforme o RGPD e as leis de Cabo Verde, tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aceder aos seus dados pessoais</li>
              <li>Corrigir informações incorretas</li>
              <li>Eliminar os seus dados (direito ao esquecimento)</li>
              <li>Exportar os seus dados num formato legível</li>
              <li>Retirar o consentimento a qualquer momento</li>
            </ul>
            <p>
              Para exercer qualquer destes direitos, contacte-nos através do email: 
              <a href="mailto:privacidade@taxifatura.cv" className="text-blue-600 hover:underline">
                privacidade@taxifatura.cv
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Retenção de Dados</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Mantemos os seus dados apenas pelo tempo necessário para fornecer o serviço:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dados de conta: enquanto a conta estiver ativa</li>
              <li>Histórico de faturas: 7 anos (conforme legislação fiscal)</li>
              <li>Dados de suporte: 2 anos após resolução</li>
            </ul>
            <p>
              Após estes períodos, os dados são eliminados de forma segura e irreversível.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Contacto</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Para questões sobre privacidade ou exercer os seus direitos, contacte-nos:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p><strong>Email:</strong> privacidade@taxifatura.cv</p>
              <p><strong>Telefone:</strong> +238 123 456 789</p>
              <p><strong>Morada:</strong> Praia, Santiago, Cabo Verde</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}