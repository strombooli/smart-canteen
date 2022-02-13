<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* error/report_form.twig */
class __TwigTemplate_0eb2b4fb1cd8dce7964d5fa486459f0de05d5a946221800d94abc62601fcafab extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<form action=\"";
        echo PhpMyAdmin\Url::getFromRoute("/error-report");
        echo "\" method=\"post\" name=\"report_frm\" id=\"report_frm\"
      class=\"ajax\">
    <fieldset style=\"padding-top:0\">

        <p>
            ";
        // line 6
        echo _gettext("This report automatically includes data about the error and information about relevant configuration settings. It will be sent to the phpMyAdmin team for debugging the error.");
        // line 9
        echo "        </p>

        <div class=\"label\"><label><strong>
                    ";
        // line 12
        echo _gettext("Can you tell us the steps leading to this error? It decisively helps in debugging:");
        // line 13
        echo "                </strong></label>
        </div>
        <textarea class=\"report-description\" name=\"description\"
                  id=\"report_description\"></textarea>

        <div class=\"label\"><label><p>
                    ";
        // line 19
        echo _gettext("You may examine the data in the error report:");
        // line 20
        echo "                </p></label></div>
        <pre class=\"report-data\">";
        // line 21
        echo ($context["report_data"] ?? null);
        echo "</pre>

        <input type=\"checkbox\" name=\"always_send\" id=\"always_send_checkbox\">
        <label for=\"always_send_checkbox\">
            ";
        // line 25
        echo _gettext("Automatically send report next time");
        // line 26
        echo "        </label>

    </fieldset>

    ";
        // line 30
        echo ($context["hidden_inputs"] ?? null);
        echo "
    ";
        // line 31
        echo ($context["hidden_fields"] ?? null);
        echo "
</form>
";
    }

    public function getTemplateName()
    {
        return "error/report_form.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  87 => 31,  83 => 30,  77 => 26,  75 => 25,  68 => 21,  65 => 20,  63 => 19,  55 => 13,  53 => 12,  48 => 9,  46 => 6,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "error/report_form.twig", "E:\\IIS Servers\\smart-canteen\\phpMyAdmin\\templates\\error\\report_form.twig");
    }
}
