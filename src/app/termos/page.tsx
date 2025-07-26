import { PageLayout } from "@/components/ui/page-layout"

export default function TermosPage() {
  return (
    <PageLayout title="Termos de Serviço" lastUpdated="26 de Julho de 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Aceitação dos Termos</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Ao utilizar a plataforma TaxiFatura, concorda com estes Termos de Serviço.
              Se não concordar com qualquer parte destes termos, não deve utilizar o nosso serviço.
            </p>
            <p>
              Estes termos aplicam-se a todos os utilizadores da plataforma TaxiFatura,
              incluindo taxistas profissionais, empresas de táxi e utilizadores individuais.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Descrição do Serviço</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              A TaxiFatura é uma plataforma digital que permite aos taxistas de Cabo Verde:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gerar faturas e recibos profissionais de forma rápida</li>
              <li>Gerir o histórico de viagens e rendimentos</li>
              <li>Acompanhar estatísticas de negócio</li>
              <li>Emitir documentos conforme a legislação fiscal de Cabo Verde</li>
            </ul>
            <p>
              O serviço está disponível através de aplicação web e é gratuito para uso básico,
              com funcionalidades premium disponíveis mediante subscrição.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Responsabilidades do Utilizador</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>Como utilizador da TaxiFatura, compromete-se a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Manter a confidencialidade dos seus dados de acesso</li>
              <li>Utilizar o serviço apenas para fins legais e legítimos</li>
              <li>Respeitar os direitos de propriedade intelectual</li>
              <li>Não tentar aceder a sistemas ou dados não autorizados</li>
              <li>Cumprir toda a legislação fiscal aplicável em Cabo Verde</li>
            </ul>
            <p>
              <strong>Importante:</strong> É da sua responsabilidade garantir que as faturas emitidas
              cumprem todos os requisitos legais e fiscais de Cabo Verde.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Propriedade Intelectual</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              A plataforma TaxiFatura, incluindo todo o software, design, textos, gráficos e outros conteúdos,
              é propriedade da TaxiFatura Lda. e está protegida por leis de direitos de autor.
            </p>
            <p>
              Os dados que introduz na plataforma (informações de viagens, clientes, etc.) permanecem sua propriedade.
              Concede-nos apenas a licença necessária para fornecer o serviço.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Limitação de Responsabilidade</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              A TaxiFatura esforça-se por fornecer um serviço confiável, mas:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>O serviço é fornecido "como está" sem garantias expressas</li>
              <li>Não garantimos disponibilidade 100% do tempo</li>
              <li>Não somos responsáveis por perdas de dados devido a falhas técnicas</li>
              <li>A responsabilidade fiscal das faturas emitidas é exclusivamente sua</li>
              <li>Recomendamos manter backups dos seus dados importantes</li>
            </ul>
            <p>
              Em caso algum a nossa responsabilidade excederá o valor pago pelo serviço nos últimos 12 meses.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Pagamentos e Cancelamentos</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              <strong>Serviço Gratuito:</strong> As funcionalidades básicas são gratuitas e sem limite de tempo.
            </p>
            <p>
              <strong>Funcionalidades Premium:</strong> Quando disponíveis, serão cobradas mensalmente.
              Pode cancelar a qualquer momento sem penalização.
            </p>
            <p>
              <strong>Política de Reembolso:</strong> Reembolsos são processados proporcionalmente
              para subscrições canceladas dentro de 30 dias.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Modificações dos Termos</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Podemos atualizar estes termos ocasionalmente. Todas as alterações serão:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Notificadas por email com 30 dias de antecedência</li>
              <li>Publicadas nesta página com a data de atualização</li>
              <li>Destacadas claramente quando fizer login na plataforma</li>
            </ul>
            <p>
              O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Lei Aplicável</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Estes termos são regidos pelas leis de Cabo Verde. Qualquer disputa será resolvida
              nos tribunais competentes de Cabo Verde, preferencialmente através de mediação.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p><strong>Questões ou Disputas:</strong></p>
              <p>Email: legal@taxifatura.cv</p>
              <p>Telefone: +238 123 456 789</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}