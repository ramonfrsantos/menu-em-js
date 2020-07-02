fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((json) => {
    
    // Ordenação
    $("th").on("click", function () {
      var column = $(this).data("column");
      var order = $(this).data("order");
      var text = $(this).html();
      text = text.substring(0, text.length - 1);

      // Ordem crescente ou decrescente
      if (order == "desc") {
        $(this).data("order", "asc");
        json = json.sort((a, b) => (a[column] > b[column] ? 1 : -1));

        text += "&#9660"; // Entity de seta para baixo
      } else {
        $(this).data("order", "desc");
        json = json.sort((a, b) => (a[column] < b[column] ? 1 : -1));

        text += "&#9650";
      }
      $(this).html(text);

      buildTable(json);
    });

    //verificação dos dados digitados
    $("#search-input").on("keyup", function () {
      const value = $(this).val();

      var data = searchTable(value, json);

      buildTable(data);
    });

    buildTable(json);

    //função pesquisar
    function searchTable(value, data) {
      var filteredData = [];

      for (var i = 0; i < data.length; i++) {
        const id = data[i].id;

        if (id == value) {
          filteredData.push(data[i]);
        } else if (value == "") {
          return json;
        }
      }

      return filteredData;
    }

    //Definição da Paginação

    var numberOfItems = $("#myTable tr").length;
    var limitPerPage = 25;

    $("#myTable tr:gt(" + (limitPerPage - 1) + ")").hide();

    var totalPages = Math.round(numberOfItems / limitPerPage);

    $(".pagination").append(
      "<li id='currentPage' class='page-item active'><a class='page-link' href='javascript:void(0)'>" +
        1 +
        "</a></li>"
    );

    //loop
    for (var i = 2; i <= totalPages; i++) {
      //pagina 1 ja foi inserida
      $(".pagination").append(
        "<li id='currentPage' class='page-item'><a class='page-link' href='javascript:void(0)'>" +
          i +
          "</a></li>"
      );
    }

    $(".pagination").append(
      "<li id='nextPage' class='page-item'><a class='page-link' href='javascript:void(0)'>Next</a></li>"
    );

    $(".pagination li#currentPage").on("click", function () {
      // isso faz com que só as paginas numeradas assumam ação no clique
      if ($(this).hasClass("active")) {
        return false;
      } else {
        var currentPage = $(this).index();
        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        $("#myTable tr").hide();

        var grandTotal = limitPerPage * currentPage;

        for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
          $("#myTable tr:eq(" + i + ")").show();
        }
      }
    });

    //Botão de próxima página

    $("#nextPage").on("click", function () {
      var currentPage = $(".pagination li.active").index();

      $(".pagination li.active").index();

      if (currentPage === totalPages) {
        return false;
      } else {
        currentPage++;
        $(".pagination li").removeClass("active");
        $("#myTable tr").hide();

        var grandTotal = limitPerPage * currentPage;

        for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
          $("#myTable tr:eq(" + i + ")").show();
        }
      }
    });

    //Botão de página anterior

    $("#previousPage").on("click", function () {
      var currentPage = $(".pagination li.active").index();
      $(".pagination li.active").index();
      if (currentPage === 1) {
        return false;
      } else {
        currentPage--;
        $(".pagination li").removeClass("active");
        $("#myTable tr").hide();

        var grandTotal = limitPerPage * currentPage;

        for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
          $("#myTable tr:eq(" + i + ")").show();
        }
      }
    });

    function buildTable(data) {
      var table = document.getElementById("myTable");

      table.innerHTML = "";

      for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                            <td>${data[i].userId}</td>
                            <td>${data[i].id}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].completed}</td>
                        </tr>`;
        table.innerHTML += row;
      }
    }
  });
