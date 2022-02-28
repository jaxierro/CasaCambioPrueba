define(function () {
  // Armenian
  return {
    errorLoading: function () {
      return 'Արդյունքները հնարավոր չէ բեռնել։';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Խնդրում ենք հեռացնել ' + overChars + ' նշան';

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Խնդրում ենք մուտքագրել ' + remainingChars +
        ' կամ ավել նշաններ';

      return message;
    },
    loadingMore: function () {
      return 'Բեռնվում են նոր արդյունքներ․․․';
    },
    maximumSelected: function (args) {
      var message = 'Դուք կարող ե�define(function () {
  // Armenian
  return {
    errorLoading: function () {
      return 'Արդյունքները հնարավոր չէ բեռնել։';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Խնդրում ենք հեռացնել ' + overChars + ' նշան';

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Խնդրում ենք մուտքագրել ' + remainingChars +
        ' կամ ավել նշաններ';

      return message;
    },
    loadingMore: function () {
      return 'Բեռնվում են նոր արդյունքներ․․․';
    },
    maximumSelected: function (args) {
      var message = 'Դուք կարող եք ընտրել առավելագույնը ' + args.maximum +
        ' կետ';

      return message;
    },
    noResults: function () {
      return 'Արդյունքներ չեն գտնվել';
    },
    searching: function () {
      return 'Որոնում․․․';
    }
  };
});
