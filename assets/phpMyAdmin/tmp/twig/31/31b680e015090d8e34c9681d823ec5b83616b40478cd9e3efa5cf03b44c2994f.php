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

/* table/structure/partition_definition_form.twig */
class __TwigTemplate_3b64b5c8f2b3b8c33374febcca03be28d4d6324668dbad785fb37d60626ce4ad extends \Twig\Template
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
        echo PhpMyAdmin\Url::getFromRoute("/table/structure/partitioning");
        echo "\" method=\"post\">
    ";
        // line 2
        echo PhpMyAdmin\Url::getHiddenInputs(($context["db"] ?? null), ($context["table"] ?? null));
        echo "

    <fieldset>
        <legend>";
        // line 5
        echo _gettext("Edit partitioning");
        echo "</legend>
        ";
        // line 6
        $this->loadTemplate("columns_definitions/partitions.twig", "table/structure/partition_definition_form.twig", 6)->display(twig_to_array(["partition_details" =>         // line 7
($context["partition_details"] ?? null), "storage_engines" =>         // line 8
($context["storage_engines"] ?? null)]));
        // line 10
        echo "    </fieldset>
    <fieldset class=\"tblFooters\">
        <input class=\"btn btn-primary\" type=\"submit\" name=\"save_partitioning\" value=\"";
        // line 12
        echo _gettext("Save");
        echo "\">
    </fieldset>
</form>
";
    }

    public function getTemplateName()
    {
        return "table/structure/partition_definition_form.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  60 => 12,  56 => 10,  54 => 8,  53 => 7,  52 => 6,  48 => 5,  42 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "table/structure/partition_definition_form.twig", "E:\\IIS Servers\\smart-canteen\\phpMyAdmin\\templates\\table\\structure\\partition_definition_form.twig");
    }
}
