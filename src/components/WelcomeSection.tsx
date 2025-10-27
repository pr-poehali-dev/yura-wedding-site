const WelcomeSection = () => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 text-primary-foreground">
          Дорогой Гость!
        </h2>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12">
          <p className="text-lg md:text-xl text-primary-foreground leading-relaxed mb-6">
            Мы рады сообщить Вам, что <span className="font-semibold">12.12.2025</span> состоится самое главное торжество в нашей жизни - день нашей свадьбы!
          </p>
          <p className="text-lg md:text-xl text-primary-foreground leading-relaxed mb-8">
            Приглашаем Вас разделить с нами радость этого незабываемого дня.
          </p>
          <div className="h-px w-32 bg-primary-foreground/30 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light text-primary-foreground mb-2">
            Ждем Вас <span className="font-semibold">12.12.2025 в 10:40</span>
          </p>
          <p className="text-lg md:text-xl text-muted-foreground">
            по адресу:
          </p>
          <p className="text-xl md:text-2xl font-serif text-primary-foreground mt-2">
            проспект Ленина, 83
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
